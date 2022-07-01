use std::iter::{ExactSizeIterator, StepBy};

#[derive(Debug, Clone)]
pub struct StrideIterator<I, const S: usize>
    where I: ExactSizeIterator
{
    start_len: usize,
    iter: I
}

impl<I, const S: usize> StrideIterator<I, S>
    where I: ExactSizeIterator,
    I: Clone
{
    fn new(iter: I) -> StrideIterator<I, S> {
        StrideIterator{ 
            start_len: iter.len(), 
            iter: iter.clone()
        }
    }
    
    fn chunks_left(&self) -> usize {
        S - (self.start_len - self.iter.len())
    }
}

impl<I, const S: usize> ExactSizeIterator for StrideIterator<I, S>
    where I: ExactSizeIterator,
    I: Clone
{
    fn len(&self) -> usize {
        self.chunks_left()
    }
}

impl<I, const S: usize> Iterator for StrideIterator<I, S>
    where I: ExactSizeIterator,
    I: Clone
{
    type Item = StepBy<I>;

    fn next(&mut self) -> Option<StepBy<I>> {
        if self.chunks_left() == 0 {
            return None;
        }
        let ret = Some(self.iter.clone().step_by(S));
        self.iter.next();
        ret
    }

    fn size_hint(&self) -> (usize, Option<usize>) {
        let retlen = self.len();
        (retlen, Some(retlen))
    }
}

pub trait StrideIteratorTrait : ExactSizeIterator
    where Self: Sized,
    Self: Clone
{
    #[inline]
    fn stride_iterator<const S: usize>(self) -> StrideIterator<Self, S>
    {
        StrideIterator::new(self)
    }
}

impl<T: Clone> StrideIteratorTrait for T where T: ExactSizeIterator { }

#[derive(Debug, Clone)]
pub struct FFTStepRange {
    pub start: usize,
    pub end: usize,
    pub shift: usize,
}

impl FFTStepRange {
    pub fn new(start: usize, end: usize, shift: usize) -> FFTStepRange {
        // assert!((end - start).count_ones() == 1);
        // assert!(end - start > (1 << shift));
        FFTStepRange{
            start: start,
            end: end,
            shift: shift
        }
    }

    pub fn split(&self) -> (FFTStepRange, FFTStepRange) {
        let mid = self.start + (self.end - self.start) / 2;
        (
            FFTStepRange{
                start: self.start, 
                end: mid, 
                shift: self.shift
            }, 
            FFTStepRange{
                start: mid, 
                end: self.end, 
                shift: self.shift
        })
    }

    pub fn stride_2(&self) -> (FFTStepRange, FFTStepRange) {
        let new_shift = self.shift + 1;
        let off = 1 << self.shift;
        (
            FFTStepRange{
                start: self.start,
                end: self.end,
                shift: new_shift
            },
            FFTStepRange{
                start: self.start + off,
                end: self.end + off,
                shift: new_shift
            },
        )
    }

    pub fn get(&self, idx: usize) -> usize {
        self.start + (1 << self.shift)*idx
    }
}

impl Iterator for FFTStepRange {
    type Item = usize;

    #[inline]
    fn next(&mut self) -> Option<usize> {

        if self.start >= self.end {
            None
        } else {
            let cur = self.start;
            self.start = self.start + (1 << self.shift);
            Some(cur)
        }
    }

    fn size_hint(&self) -> (usize, Option<usize>) {
        let len = self.len();
        (len, Some(len))
    }
}

impl ExactSizeIterator for FFTStepRange {
    fn len(&self) -> usize {
        (self.end - self.start) >> self.shift
    }
}