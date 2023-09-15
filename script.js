const getInfo = async () => {
  //
  // const { data, error } = await _supabase.storage.from('form-photo').list('.');
  // console.log('****', data);
  // console.log('****', error);
  let { data: VarahiTbl, error } = await _supabase
    .from('VarahiTbl')
    .select('*');
  console.log(VarahiTbl);
  console.log(error);
};
