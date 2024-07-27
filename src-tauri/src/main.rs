// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use crate::unrestricted_fs::*;

mod unrestricted_fs;

fn main() {
  tauri::Builder::default()
      .invoke_handler(tauri::generate_handler![
          read_file,
          write_file,
          remove_file,
          create_directory,
          remove_directory,
          list_files,
          list_subdirectories,
          join_path,
          file_exists
      ])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
