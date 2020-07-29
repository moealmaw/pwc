
const { connection } = require("../database");
class ComplaintService {
  // get complaint by id
  async firstById(id) {
    const complaint = await connection('complaints')
      .select('*')
      .where({ id: id })
      .limit(1).catch(err => null);
    if (complaint.length) {
      return complaint[0];
    }
    return null;
  }
  // get logged in user complaint
  async userComplaints(user_id) {
    const complaints = await connection('complaints')
      .select('*')
      .where({ user_id: user_id })
      .orderBy('id', 'desc')
      .catch(err => null);
    return complaints;
  }
  // get all complaints, only for admin
  async all() {
    const complaints = await connection('complaints')
      .select('*')
      .orderBy('id', 'desc')
      .catch(err => null);
    return complaints;
  }
  async createComplaint({ title, body, user_id }) {
    const insertedId = await connection('complaints').returning("*").insert({ title, body, user_id });
    if (insertedId) {
      return this.firstById(insertedId);
    }
  }
  async updateComplaint(complaintId, { title, body, status }) {
    await connection('complaints').where({ id: complaintId }).update({ title, body, status });
    return await this.firstById(complaintId);
  }
}

module.exports = new ComplaintService
