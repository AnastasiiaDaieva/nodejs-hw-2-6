const path = require('path');
const fs = require('fs/promises');
const { User } = require('../../models/user');
const avatarsDir = path.join(__dirname, '../../', 'public', 'avatars');
const Jimp = require('jimp');

const patchAvatar = async (req, res, next) => {
  const { path: tmpUpload, filename } = req.file;

  const { _id } = req.user;
  try {
    await Jimp.read(tmpUpload)
      .then(avatar => {
        return avatar.resize(250, 250).write(tmpUpload);
      })
      .catch(err => console.error(err));

    const [extension] = filename.split('.').reverse();
    const newFilename = `${_id}.${extension}`;
    const resultingPath = path.join(avatarsDir, newFilename);
    await fs.rename(tmpUpload, resultingPath);

    const avatarURL = path.join('avatars', newFilename);

    await User.findByIdAndUpdate(_id, { avatarURL });
    res.json(`avatarURL: ${avatarURL}`);
  } catch (error) {
    next(error);
  }
};

module.exports = patchAvatar;
