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
const getInfo = async (dt) => {
  let infoDt = JSON.parse(dt);
  infoDt.name = crypto.randomUUID();
  infoDt.qrcode = `https://chart.googleapis.com/chart?cht=qr&chl=${infoDt.name}&chs=150x150&chld=L|0`;
  console.log('****', infoDt);
  const { data: VarahiTbl, error } = await _supabase
    .from('VarahiTbl')
    .insert([infoDt])
    .select();
  console.log(VarahiTbl);
  console.log(error);
  return VarahiTbl;
};
