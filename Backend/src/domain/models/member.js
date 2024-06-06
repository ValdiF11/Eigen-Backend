class Member {
  constructor(id, code, name, password, penaltyStatus, penaltyDate, borrowedCount) {
    this.id = id;
    this.code = code;
    this.name = name;
    this.password = password;
    this.penaltyStatus = penaltyStatus;
    this.penaltyDate = penaltyDate;
    this.borrowedCount = borrowedCount;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  update(data) {
    if (data.code !== undefined) {
      this.code = data.code;
    }
    if (data.name !== undefined) {
      this.name = data.name;
    }
    if (data.password !== undefined) {
      this.password = data.password;
    }
    if (data.penaltyStatus !== undefined) {
      this.penaltyStatus = data.penaltyStatus;
    }

    if (data.penaltyDate !== undefined) {
      this.penaltyDate = data.penaltyDate;
    }
    if (data.borrowedCount !== undefined) {
      this.borrowedCount = data.borrowedCount;
    }
    // update the updatedAt field
    this.updatedAt = new Date();
  }

  checkPenaltyStatus() {
    if (this.penaltyStatus) {
      const penaltyEndDate = new Date(this.penaltyDate);
      penaltyEndDate.setDate(penaltyEndDate.getDate() + 7); // 7 days penalty
      if (new Date() > penaltyEndDate) {
        this.penaltyStatus = false;
        this.penaltyDate = null;
      }
    }
    return this.penaltyStatus;
  }
}

module.exports = Member;
