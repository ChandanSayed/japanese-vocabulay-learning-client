import axios from "axios";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

const UploadImage = ({ setForm, image, errors }) => {
  const handleImageUpload = async event => {
    const imageFile = event.target.files[0];
    const formData = new FormData();
    formData.append("image", imageFile);
    if (imageFile) {
      try {
        const response = await axios.post(
          "https://api.imgbb.com/1/upload?key=e67dada753176ec640ceb26edb0f9c90",
          formData
        );
        console.log(response.data.data.display_url);

        setForm(prev => ({ ...prev, image: response.data.data.display_url }));
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    } else {
      setForm(prev => ({ ...prev, image: null }));
    }
  };
  return (
    <div className="mb-4">
      <Label className="block  text-base font-bold mb-2">Profile Image</Label>
      <Input
        type="file"
        className="w-full px-3 py-2 border rounded-lg"
        name="image"
        onChange={handleImageUpload}
      />
      {image && <img src={image} alt="Recipe" className="mt-4 size-28" />}
      {/* {errors.image && <p className="text-red-500 text-xs mt-2">{errors.image}</p>} */}
    </div>
  );
};

export default UploadImage;
