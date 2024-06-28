import bcrypt from "bcrypt";

const generateHash = async (password) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    return hash;
  } catch (err) {
    console.error(err);
    throw err; // Re-throw the error so the caller can handle it
  }
};

export default generateHash;
