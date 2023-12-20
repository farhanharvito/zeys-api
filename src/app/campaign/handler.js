const { Campaign } = require("../../models");

const getAllCampaign = async (req, res) => {
  try {
    const campaign = await Campaign.findAll();
    res.json(campaign);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createCampaign = async (req, res) => {
  const { name, details, date, status } = req.body;

  try {
    const newCampaign = await Campaign.create({ name, details, date, status });
    res.status(201).json(newCampaign);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateCampaign = async (req, res) => {
  const { name, details, date, status } = req.body;

  try {
    const campaign = await Campaign.findByPk(req.params.id);
    if (!campaign) {
      return res.status(404).json({ error: "Campaign not found" });
    }

    await campaign.update({ name, details, date, status });
    res.json(campaign);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteCampaign = async (req, res) => {
  try {
    const campaign = await Campaign.findByPk(req.params.id);
    if (!campaign) {
      return res.status(404).json({ error: "Campaign not found" });
    }

    await campaign.destroy();
    res.json({ message: "Campaign deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllCampaign,
  createCampaign,
  updateCampaign,
  deleteCampaign,
};
