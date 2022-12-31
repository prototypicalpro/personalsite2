use arrayvec::ArrayVec;

pub fn make_box_arrayvec<T: Sized, const S: usize>() -> Box<ArrayVec<T, S>> {
    // this both allocates uninit memory and prevents a crash when allocating normally
    // (not enough stack space to store the arrayvec I guess?)
    let mut pos_out: Box<ArrayVec<T, S>>;
    unsafe {
        pos_out = Box::new_uninit().assume_init();
        pos_out.set_len(0);
    }
    pos_out
}
