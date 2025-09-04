import Profile from "../models/user.models.js"


export const getMyProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne({ userId: req.user.id });

    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    res.status(200).json({
      message: "Profile fetched successfully",
      profile, // ✅ always wrapped
    });
  } catch (error) {
    console.error("[GET MY PROFILE ERROR]", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const editProfile = async (req, res) => {
  try {
    const { username, name, website, bio, gender } = req.body;

    // If user uploaded an image, use its URL; otherwise keep old one
    let profileimage = req.file
      ? `http://localhost:3000/uploads/${req.file.filename}`
      : undefined;

    const profile = await Profile.findOneAndUpdate(
      { userId: req.user.id },
      {
        username,
        name,
        website,
        bio,
        gender,
        ...(profileimage && { profileimage }),
      },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );

    res.status(200).json({
      message: "Profile saved successfully",
      profile: {
        username: profile.username || "",
        name: profile.name || "",
        website: profile.website || "",
        bio: profile.bio || "",
        gender: profile.gender || "",
        profileimage: profile.profileimage || "/profile_image.svg",
      },
    });
  } catch (error) {
    console.error("[EDIT PROFILE ERROR]", error);

    if (error.code === 11000 && error.keyPattern?.username) {
      return res.status(400).json({ message: "Username already taken" });
    }

    res.status(500).json({ message: "Internal server error" });
  }
};



export const getProfileByUsername = async (req, res) => {
  try {
    const { username } = req.params;

    const profile = await Profile.findOne({ username }).populate("userId", "email phoneno");

    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    res.status(200).json({
      message: "Profile fetched successfully",
      profile, // ✅ same shape as others
    });
  } catch (error) {
    console.error("[GET PROFILE BY USERNAME ERROR]", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
