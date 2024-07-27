use std::fs;
use std::path::Path;

#[tauri::command]
pub fn read_file(path: String) -> String {
  return fs::read_to_string(path).expect("Something went wrong reading the file")
}

#[tauri::command]
pub fn write_file(path: String, content: String) {
  fs::write(path, content).expect("Something went wrong writing the file")
}

#[tauri::command]
pub fn remove_file(path: String) {
  fs::remove_file(path).expect("Something went wrong removing the file")
}

#[tauri::command]
pub fn create_directory(path: String) {
  fs::create_dir(path).expect("Something went wrong creating the directory")
}

#[tauri::command]
pub fn remove_directory(path: String) {
  fs::remove_dir(path).expect("Something went wrong removing the directory")
}

#[tauri::command]
pub fn list_files(path: String) -> Vec<String> {
    let mut files = vec![];
    for entry in fs::read_dir(path).expect("Something went wrong reading the directory") {
        let entry = entry.expect("Something went wrong reading the entry");
        let path = entry.path();
        if path.is_file() {
            let path = path.to_str().expect("Something went wrong converting the path to string");
            files.push(path.to_string());
        }
    }
    return files;
}

#[tauri::command]
pub fn list_subdirectories(path: String) -> Vec<String> {
    println!("Listing directories under path: {}", path);

    let mut directories = vec![];
    for entry in fs::read_dir(path).expect("Something went wrong reading the directory") {
        let entry = entry.expect("Something went wrong reading the entry");
        let path = entry.path();
        if path.is_dir() {
            let path = path.to_str().expect("Something went wrong converting the path to string");
            directories.push(path.to_string());
        }
    }
    return directories;
}

#[tauri::command]
pub fn join_path(paths: Vec<String>) -> String {
    let path = Path::new(&paths[0]);
    let mut path = path.join(&paths[1]);
    for i in 2..paths.len() {
        path = path.join(&paths[i]);
    }
    return path.to_str().expect("Something went wrong converting the path to string").to_string();
}
