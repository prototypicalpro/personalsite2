use arrayvec::ArrayVec;

#[derive(Debug, Clone)]
pub struct BitShuffleIterator<I, const B: usize, const N: usize>
    where I: Iterator,
    I::Item: Copy
{
    collected: ArrayVec<I::Item, N>,
    index: usize
}

impl<I, const B: usize, const N: usize> BitShuffleIterator<I, B, N>
    where I: Iterator,
    I::Item: Copy 
{
    const LOOKUP: [usize; N] = get_bitshuffle_lookup::<N>(B);
}

impl<I, const B: usize, const N: usize> Iterator for BitShuffleIterator<I, B, N>
    where I: Iterator,
    I::Item: Copy
{
    type Item = I::Item;

    fn next(&mut self) -> Option<Self::Item> {
        if self.index >= self.collected.len() {
            return None;
        }
        let tmp_index = self.index;
        self.index += 1;
        Some(self.collected[Self::LOOKUP[tmp_index]])
    }

    fn size_hint(&self) -> (usize, Option<usize>) {
        let retlen = self.collected.len() - self.index;
        (retlen, Some(retlen))
    }
}

impl<I, const B: usize, const N: usize> ExactSizeIterator for BitShuffleIterator<I, B, N>
    where I: Iterator,
    I::Item: Copy
{
    fn len(&self) -> usize {
        self.collected.len() - self.index
    }
}

pub const fn get_bitshuffle_lookup<const N: usize>(b: usize) -> [usize; N] {
    let usize_bits: usize = usize::BITS as usize;

    assert!(b <= usize_bits);
    let shift: usize = usize_bits - b;

    let mut ret: [usize; N] = [0; N];
    let mut i = 0;
    while i < ret.len() {
        ret[i] = i.reverse_bits() >> shift;
        i += 1;
    }
    ret
}

fn bitshufflenew<I, const B: usize, const N: usize>(iter: I) -> BitShuffleIterator<I, B, N>
    where I: Iterator,
    I::Item: Copy
{
    // const_assert_eq!(2**B, N);
    // const_assert!(B <= usize::BITS);
    BitShuffleIterator{ collected: iter.collect(), index: 0 }
}

pub trait BitShuffleIteratorTrait : Iterator {
    #[inline]
    fn shuffle_iterator<const B: usize, const N: usize>(self) -> BitShuffleIterator<Self, B, N>
        where Self: Sized,
        Self::Item: Copy,
    {
        bitshufflenew(self)
    }
}

impl<T: Sized> BitShuffleIteratorTrait for T where T: Iterator { }
