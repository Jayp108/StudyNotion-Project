const Section = require("../models/Section");
const SubSection = require("../models/SubSection");
const { uploadImageToCloudinary } = require("../utils/imageUploader");

exports.createSubSection = async (req, res) =>{
    try{

       // data fetch
       const {sectionId,title,description,timeDuration} = req.body;

       // extract file and video
       const video  = req.files.videoFile;

       if (!video) {
        return res.status(400).json({
          success: false,
          message: "Video file is required",
        });
      }

    

       // validation
       if(!sectionId || !title || !description || !timeDuration){
        return res.status(400).json({
            success:false,
            message:"All fields  are required",
        });
       }

       // upload video to cloudinary
       const uploadDetails = await uploadImageToCloudinary(video, process.env.FOLDER_NAME);


       // check if section exit or not
       const section = await Section.findById(sectionId);
       if(!section){
        return res.status(404).json({
            success:false,
            message:"Section not found",
        });
       }

       // create subsection
       const subsectionDetails = await SubSection.create({
        title:title,
        timeDuration:timeDuration,
        description:description,
        videoUrl:uploadDetails.secure_url,
       });

       // push subsection into section
       const updatedSection = await Section.findByIdAndUpdate({ _id: sectionId},
        { $push:
             {
                SubSection: subsectionDetails._id
             } },
        { new: true }
       ).populate("SubSection");

       // return response
       return res.status(200).json({
        success:true,
        message:"Subsection created and added successfully",
        data: subsectionDetails,
        
       });
    }catch(error){
        console.log("Error is createSubsection:",error);
        return res.status(500).json({
            success:false,
            message:"Failed to create subsection ",
            error:error.message,
        });
    }
};


// update the subsection 

exports.updateSubSection = async (req, res) => {
  try {
    const { subSectionId, title, description, timeDuration } = req.body;

    //  video file (agar update karna ho)
     const video = req?.files?.videoFile;

    // Validation
    if (!subSectionId) {
      return res.status(400).json({
        success: false,
        message: "subSectionId is required",
      });
    }

    // Find existing subsection
    const subSection = await SubSection.findById(subSectionId);
    if (!subSection) {
      return res.status(404).json({
        success: false,
        message: "SubSection not found",
      });
    }

    // Prepare update object (jo fields aaye hain, wahi update karo)
    const updateData = {};

    if (title) updateData.title = title;
    if (description) updateData.description = description;
    if (timeDuration) updateData.timeDuration = timeDuration;

    // Agar tum video bhi update karna chahte ho:
    if (video) {
      const uploadDetails = await uploadImageToCloudinary(
        video,
        process.env.FOLDER_NAME
      );
      updateData.videoUrl = uploadDetails.secure_url;
    }
    
   // update subsection
    const updatedSubSection = await SubSection.findByIdAndUpdate(
      subSectionId,
      updateData,
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "SubSection updated successfully",
      data: updatedSubSection,
    });
  } catch (error) {
    console.log("Error in updateSubSection:", error);
    return res.status(500).json({
      success: false,
      message: "Error while updating subsection",
      error: error.message,
    });
  }
};


// delete the subsection 

exports.deleteSubSection = async (req, res) => {
    try {
      const { subSectionId, sectionId } = req.body;
  
      // Validation
      if (!subSectionId || !sectionId) {
        return res.status(400).json({
          success: false,
          message: "subSectionId and sectionId are required",
        });
      }
  
      // Check if subsection exists
      const subSection = await SubSection.findById(subSectionId);
      if (!subSection) {
        return res.status(404).json({
          success: false,
          message: "SubSection not found",
        });
      }
  
      // Section se SubSection id ko pull karo
      await Section.findByIdAndUpdate(
        sectionId,
        {
          $pull: { SubSection: subSectionId },
        },
        { new: true }
      );
  
      // SubSection document ko delete karo
      await SubSection.findByIdAndDelete(subSectionId);
  
      return res.status(200).json({
        success: true,
        message: "SubSection deleted successfully",
      });
    } catch (error) {
      console.log("Error in deleteSubSection:", error);
      return res.status(500).json({
        success: false,
        message: "Error while deleting subsection",
        error: error.message,
      });
    }
  };
    