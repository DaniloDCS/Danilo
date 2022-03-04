import App from "./App";
import "dotenv/config";

const PORT = process.env.PORT || 5000;

App.listen(PORT, () => {
    console.clear();
    console.log(`Server started on port ${PORT}`);
});
