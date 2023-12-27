use std::iter::{ExactSizeIterator};
use itertools::traits::HomogeneousTuple;

/// An iterator that groups the items in tuples of a specific size.
///
/// See [`.tuples()`](crate::Itertools::tuples) for more information.
#[derive(Clone, Debug)]
#[must_use = "iterator adaptors are lazy and do nothing unless consumed"]
pub struct TuplesExact<I, T>
    where I: ExactSizeIterator<Item = T::Item>,
          T: HomogeneousTuple
{
    iter: I,
    buf: T::Buffer,
    tup_len: usize
}

/// Create a new tuples iterator.
pub fn tuples_exact_base<I, T, const L: usize>(iter: I) -> TuplesExact<I, T>
    where I: ExactSizeIterator<Item = T::Item>,
          T: HomogeneousTuple
{
    assert!(iter.len() % L == 0);
    TuplesExact {
        iter: iter,
        buf: Default::default(),
        tup_len: L
    }
}

impl<I, T> ExactSizeIterator for TuplesExact<I, T>
    where   I: ExactSizeIterator<Item = T::Item>,
            T: HomogeneousTuple
{
    fn len(&self) -> usize {
        self.iter.len() / self.tup_len
    }
}

impl<I, T> Iterator for TuplesExact<I, T>
    where I: ExactSizeIterator<Item = T::Item>,
          T: HomogeneousTuple
{
    type Item = T;

    fn next(&mut self) -> Option<Self::Item> {
        T::collect_from_iter(&mut self.iter, &mut self.buf)
    }

    fn size_hint(&self) -> (usize, Option<usize>) {
        let len = self.len();
        (len, Some(len))
    }
}

pub trait TuplesExactIteratorTrait : ExactSizeIterator {
    fn tuples_exact<T, const L: usize>(self) -> TuplesExact<Self, T>
    where Self: Sized + ExactSizeIterator<Item = T::Item>,
        T: HomogeneousTuple
    {
        tuples_exact_base::<Self, T, L>(self)
    }
}

impl<T: Sized> TuplesExactIteratorTrait for T where T: ExactSizeIterator { }
