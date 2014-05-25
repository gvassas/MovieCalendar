/**
 * Created by Gui on 04/12/13.
 */

function DataManager() {

    this.showsList = null;
}
DataManager.prototype.constructor = DataManager;

/**
 * Issues XMLHTTPRequest based on passed filename string
 * @param {string}fileName
 */
DataManager.prototype

DataManager.prototype._showsReviver = function (key, value) {
    if (key === "date") {
        value = new Date(value);
    }
    return value;
};

DataManager.prototype

DataManager.prototype

