const uploadFile = async (fileEvent) => {
  const fileList = fileEvent.target.files;

  let returnValue = '';
  try {
    if (!fileList || fileList.length === 0) {
      throw new Error('You must select an image to upload.');
    }
    const file = fileList[0];
    const fileExt = file.name.split('.').pop();
    const filePath = `${Math.random()}.${fileExt}`;

    console.log('----', filePath);
    console.log('----', file);
    let { error } = await _supabase.storage
      .from('form-photo')
      .upload(`formdt/${filePath}`, file);
    if (error) {
      throw error;
    }
    returnValue = filePath;
  } catch (error) {
    if (error instanceof Error) {
      alert(error.message);
      returnValue = '----';
    }
  } finally {
  }
  return returnValue;
};
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
