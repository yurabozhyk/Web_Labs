var useLocalStorage = false;

function LocalStorageProvider(){};

LocalStorageProvider.prototype.add = function(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
};

LocalStorageProvider.prototype.get = function(key, callback) {
  callback(JSON.parse(localStorage.getItem(key)));
};

LocalStorageProvider.prototype.delete = function(key) {
  localStorage.removeItem(key);
}

var db;

function IndexedDBProvider(){
  var openRequest = indexedDB.open('bbnos_db', 1);

  openRequest.onerror = function() {
    console.error("Error", openRequest.error);
  };

  openRequest.onsuccess = function() {
    console.log("Success!");
    db = openRequest.result;
  };

  openRequest.onupgradeneeded = function() {
      console.log("Upgrading...");
      db = openRequest.result;
      db.createObjectStore("appeals", {keyPath: "id", autoIncrement: true});
      db.createObjectStore("news", {keyPath: "id", autoIncrement: true});
  }
};

IndexedDBProvider.prototype.add = function(key, value) {
  var transaction = db.transaction(key, "readwrite");
  var objS = transaction.objectStore(key);
  objS.clear();
  for (i = 0; i < value.length; i++) {
    objS.add(value[i]);
  }
};

IndexedDBProvider.prototype.get = function(key, callback) {
  var transaction = db.transaction(key, "readwrite");
  var objS = transaction.objectStore(key);
  var request = objS.getAll();
  request.onsuccess = function() {
    callback(request.result);
  };
};

IndexedDBProvider.prototype.delete = function(key) {
  var transaction = db.transaction(key, "readwrite");
  var objS = transaction.objectStore(key);
  objS.clear();
}

var Provider = function() {
  if (useLocalStorage) {
    this.provider = new LocalStorageProvider();
  }
  else {
    this.provider = new IndexedDBProvider();
  }
}
