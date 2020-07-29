const { validateRequest } = require("../Utils");
const ComplaintService = require("../services/ComplaintService");
const { LOGIN_TYPE, COMPLAINT_STATUS } = require("../constants");

const ComplaintsController = {

  list: async (req, res) => {
    let complaints;
    try {
      if (req.user.type === LOGIN_TYPE.ADMIN) {
        complaints = await ComplaintService.all();
      } else {
        complaints = await ComplaintService.userComplaints(req.user.id);
      }
      res.send(complaints);
    } catch (error) {
      res.status(400).send({
        error: error.message
      })
    }
  },

  store: async (req, res) => {
    const { title, body } = validateRequest(req, res, {
      title: 'required|string',
      body: 'required|string',
    });
    try {
      const complaint = await ComplaintService.createComplaint({ title, body, userId: req.user.id })
      res.send(complaint);
    } catch (error) {
      res.status(400).send({
        error: error.message
      })
    }
  },

  update: async (req, res) => {
    const complaint = await ComplaintService.firstById(req.params.complaintId);
    if (!complaint) {
      res.status(404).send({
        error: "COMPLAINT_NOT_FOUND",
        message: "Invalid complaint"
      })
    }
    //check if the user owns the complaint, or the user is an admin
    const canUpdate = req.user.type === LOGIN_TYPE.ADMIN || complaint.user_id === req.user.id;

    if (!canUpdate) {
      res.status(403).send({
        error: "ACCESS_FORBIDDEN",
        message: "You dont have permission to access this complaint"
      })
    }

    const { title, body, status } = validateRequest(req, res, {
      id: complaint.id,
      title: 'string',
      body: 'string',
      status: `string|in:${Object.keys(COMPLAINT_STATUS).join(',')}`
    });

    try {
      const complaintUpdate = await ComplaintService.updateComplaint(complaint.id, { title, body, status });
      res.send({ complaint: complaintUpdate });
    } catch (error) {
      res.status(400).send({
        error: error.message
      })
    }
  }
}
module.exports = ComplaintsController
