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
const getPublicUrl = async (file1) => {
  const { data: dt } = await _supabase.storage
    .from('form-photo')

    .getPublicUrl(`formdt/${file1}`);
  console.log('****', dt.publicUrl);
  return dt.publicUrl;
};
const getDataUri = (url, cb) => {
  var image = new Image();
  image.setAttribute('crossOrigin', 'anonymous');
  image.onload = function () {
    var canvas = document.createElement('canvas');
    canvas.width = this.naturalWidth;
    canvas.height = this.naturalHeight;
    var ctx = canvas.getContext('2d');
    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    canvas.getContext('2d').drawImage(this, 0, 0);
    cb(canvas.toDataURL('image/jpeg'));
  };
  image.src = url;
};
const printpdf = (imgUrl1, qrCode1) => {
  const doc = new jsPDF({
    orientation: 'landscape',
    units: 'pts',
  });
  getDataUri(imgUrl1, function (dataUri) {
    let logo = dataUri;
    console.log('logo=' + logo);
    let left = 15;
    let top = 8;
    const imgWidth = 50;
    const imgHeight = 50;
    doc.addImage(logo, 'PNG', left, top, imgWidth, imgHeight);
    getDataUri(qrCode1, function (dataUri) {
      let logo = dataUri;
      console.log('logo=' + logo);
      let left = 15;
      let top = 57 + 8;
      const imgWidth = 50;
      const imgHeight = 50;
      doc.addImage(logo, 'PNG', left, top, imgWidth, imgHeight);
      doc.output('dataurlnewwindow');
    });
  });
};
