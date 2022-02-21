const path = require('path');
const fs = require('fs/promises');
const { User } = require('../../models/user');
const avatarsDir = path.join(__dirname, '../../', 'public', 'avatars');
const Jimp = require('jimp');

const patchAvatar = async (req, res, next) => {
  const { path: tmpUpload, filename } = req.file;
  const { _id } = req.user;
  try {
    const [extension] = filename.split('.').reverse();
    console.log(filename);
    const newFilename = `${_id}.${extension}`;
    const resultingPath = path.join(avatarsDir, newFilename);

    await fs.rename(tmpUpload, resultingPath);

    //   jimp

    // open a file called "lenna.png"
    // Jimp.read('lenna.png', (err, lenna) => {
    //   if (err) throw err;
    //   lenna
    //     .resize(256, 256) // resize
    //     .quality(60) // set JPEG quality
    //     .greyscale() // set greyscale
    //     .write('lena-small-bw.jpg'); // save
    // });

    //   Jimp.read(newFilename, (err, avatar) => {
    //     if (err) {
    //       throw err;
    //     }
    //     const [extension, ...rest] = newFilename.split('.').reverse();
    //     const resizedAvatarName = `${rest.reverse()}-small.${extension}`;
    //     avatar.resize(250, 250, Jimp.RESIZE_BILINEAR).write(resizedAvatarName);
    //     console.log(resizedAvatarName);
    //   });

    const avatarURL = path.join('avatars', newFilename);
    await User.findByIdAndUpdate(_id, { avatarURL });
    res.json(`avatarURL: ${avatarURL}`);
  } catch (error) {
    next(error);
  }
};

module.exports = patchAvatar;
