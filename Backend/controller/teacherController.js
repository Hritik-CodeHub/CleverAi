const classSchema = requier("./models/class");

//creating new class
const createClass = async (req, res) => {
  const { teacher, className } = req.body;
  if (!teacher || !className) {
    try {
      const newClass = await classSchema.create({
        name: className,
        teacher: teacher,
      });
      console.log("New class created successfully", newClass);
      res.status(200).json({ message: "New class created successfully"});
    } catch (error) {
      console.log("Creating class server error", error);
      res.status(400).json({ message: "Creating class server error" });
    }
  } else {
    console.log("teacher required");
    res.status(400).json({ message: "teacher required" });
  }
};


//creating quesion paper
const createPaper = async(req, res) => {

}