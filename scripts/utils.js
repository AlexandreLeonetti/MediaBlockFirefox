'use strict';

// ----------------- Utils ---------------------------------
class Utils {

  static getUniqueId() {
    // We don't need cryptographically secure UUIDs, just something unique
    return Math.random().toString(36).substring(7) + new Date().getTime();
  }

  static stripBadChars(str) {
    return str ? str.replace(/[&<>"']+/g, '') : null;
  }

}
