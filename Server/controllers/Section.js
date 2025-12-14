const Section = require("../models/Section");
const Course = require("../models/Course");
const SubSection = require("../models/SubSection");

exports.createSection = async (req, res) => {
    try {
              
      
      // data fetch
      const { sectionName, courseId } = req.body;
      // validation
      if (!sectionName || !courseId) {
        return res.status(400).json({
          success: false,
          message: "All fields are required",
        });
      }
  
      //  Create Section
      const newSection = await Section.create({ sectionName });
  
      //  Add section inside course
      const updatedCourseDetails = await Course.findByIdAndUpdate(
        courseId,
        {
          $push: { courseContent: newSection._id },
        },
        { new: true }
      )
      .populate("courseContent")
      // .populate({
			// 	path: "courseContent",
			// 	populate: {
			// 		path: "subSection",
			// 	},
			// })
			.exec(); // agar tum chaho populated data return ho
        
  
      //  Return response
      return res.status(200).json({
        success: true,
        message: "Section created successfully",
        updatedCourseDetails,
      });
    } catch (error) {
      console.log("Error in createSection:", error);
      return res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      });
    }
  };


  // update Section -------------------

  exports.updateSection = async(req, res) =>{
    try{

        // data fetch
        const {sectionName, sectionId} = req.body;

        // data validation
        if(!sectionId || !sectionName){
            return res.status(400).json({
                success:false,
                message:'Missing Properties',
            });
        }

        // check section is exit or not 
        const section = await Section.findById(sectionId);
        if(!section){
            return res.status(404).json({
                success:false,
                message:'Section not found',
            });
        }
        
        // updated section
        const updatesection = await Section.findByIdAndUpdate(
            sectionId, 
            {
                sectionName
            },
            {
                new:true
            }).populate("SubSection");

            return res.status(200).json({
                success:true,
                message:"section updated successfully",
                data:updatesection,
            });

    }catch(error){
        console.log("Error in updatedSection",error);
        return res.status(500).json({
            success:false,
            message:"Error while updating section",
            error: error.message,
        });
    }
  }

   // deleteSection 
   exports.deleteSection = async (req,res) => {
    try{
        //date fetch
        const {sectionId, courseId} = req.body;

        //validation
        if(!sectionId || !courseId){
            return res.status(400).json({
                success:false,
                message:"All fields are required",
            });
        }

    //  check section exist or not
        const section = await Section.findById(sectionId);
        if(!section){
            return res.status(404).json({
                success:false,
                message:'Section not found',
            });
        }

        // delete section
               await Section.findByIdAndDelete(sectionId);
            return res.status(200).json({
                success:true,
                message:"Section deleted successfully",
            });
        
    }catch(error){
        console.log("Error is deleteSection",error);
        return res.status(500).json({
            success:false,
            message:"Error during delete the section",
            error:error.message,
        });
    }
   };
    
   
  