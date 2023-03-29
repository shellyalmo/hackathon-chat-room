import {
  useState
} from "react";

const useTranslation = () => {
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleTranslate = async (input, from, to) => {
    try {
      setOutput("")
      setLoading(true);
      const response = await fetch(`https://api.mymemory.translated.net/get?q=${input}&langpair=${from}|${to}`);
      const data = await response.json();
      return data.responseData.translatedText;
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    handleTranslate,
    output
  };
};

export default useTranslation;