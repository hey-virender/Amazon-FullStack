import bcrypt from "bcrypt";

const compareHash = async (pass, userPass) => {
  try {
    return await bcrypt.compare(pass, userPass).then((result) => {
      return result;
    });
  } catch (err) {
    console.log(`Hash Compare ${err}`);
  }
};

export default compareHash;
