use std::iter::{ExactSizeIterator};

#[derive(Debug, Clone)]
/// An iterator adaptor that iterates over the cartesian product of
/// the element sets of two iterators `I` and `J`.
///
/// Iterator element type is `(I::Item, J::Item)`.
///
/// See [`.cartesian_product()`](crate::Itertools::cartesian_product) for more information.
#[must_use = "iterator adaptors are lazy and do nothing unless consumed"]
pub struct ProductExact<I, J>
    where I: ExactSizeIterator
{
    a: I,
    a_cur: Option<I::Item>,
    b: J,
    b_orig: J,
}

/// Create a new cartesian product iterator
///
/// Iterator element type is `(I::Item, J::Item)`.
pub fn product_exact<I, J>(mut i: I, j: J) -> ProductExact<I, J>
    where I: ExactSizeIterator,
          J: Clone + ExactSizeIterator,
          I::Item: Clone
{
    ProductExact {
        a_cur: i.next(),
        a: i,
        b: j.clone(),
        b_orig: j,
    }
}

impl<I, J> Iterator for ProductExact<I, J>
    where I: ExactSizeIterator,
          J: Clone + ExactSizeIterator,
          I::Item: Clone
{
    type Item = (I::Item, J::Item);

    fn next(&mut self) -> Option<Self::Item> {
        let elt_b = match self.b.next() {
            None => {
                self.b = self.b_orig.clone();
                match self.b.next() {
                    None => return None,
                    Some(x) => {
                        self.a_cur = self.a.next();
                        x
                    }
                }
            }
            Some(x) => x
        };
        match self.a_cur {
            None => None,
            Some(ref a) => {
                Some((a.clone(), elt_b))
            }
        }
    }

    fn size_hint(&self) -> (usize, Option<usize>) {
        /*
        let has_cur = self.a_cur.is_some() as usize;
        // Not ExactSizeIterator because size may be larger than usize
        let (b_min, b_max) = self.b.size_hint();

        // Compute a * b_orig + b for both lower and upper bound
        size_hint::add(
            size_hint::mul(self.a.size_hint(), self.b_orig.size_hint()),
            (b_min * has_cur, b_max.map(move |x| x * has_cur)))
        */
        let len = self.a.len()*self.b_orig.len() + self.b.len();
        (len, Some(len))
    }

    fn fold<Acc, G>(mut self, mut accum: Acc, mut f: G) -> Acc
        where G: FnMut(Acc, Self::Item) -> Acc,
    {
        // use a split loop to handle the loose a_cur as well as avoiding to
        // clone b_orig at the end.
        if let Some(mut a) = self.a_cur.take() {
            let mut b = self.b;
            loop {
                accum = b.fold(accum, |acc, elt| f(acc, (a.clone(), elt)));

                // we can only continue iterating a if we had a first element;
                if let Some(next_a) = self.a.next() {
                    b = self.b_orig.clone();
                    a = next_a;
                } else {
                    break;
                }
            }
        }
        accum
    }
}

impl<I, J> ExactSizeIterator for ProductExact<I, J>
    where I: ExactSizeIterator,
          J: Clone + ExactSizeIterator,
          I::Item: Clone {}

pub trait ProductExactIteratorTrait : ExactSizeIterator {
    fn product_exact<J>(self, other: J) -> ProductExact<Self, J>
        where Self: ExactSizeIterator + Sized,
        J: Clone + ExactSizeIterator,
        Self::Item: Clone
    {
        product_exact::<Self, J>(self, other)
    }
}

impl<T: Sized> ProductExactIteratorTrait for T where T: ExactSizeIterator { }