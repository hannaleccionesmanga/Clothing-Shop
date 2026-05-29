const getDashboard = async (req, res) => {
    try {
        res.status(200).json({
            success: true,
            message: "Dashboard working successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {
    getDashboard
};
