import mongoose from "mongoose";
import iso6391 from "iso-639-1";

const { Schema } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "User Name is required."],
  },
  language: {
    type: String,
    required: [true, "User Language is required."],
    validate: {
      validator: function (v) {
        // Check if v is a valid language name
        return iso6391.validate(v);
      },
      message: (props) => `${props.value} is not a valid language name!`,
    },
  },
});

const User = mongoose.model("User", userSchema);

export default User;
