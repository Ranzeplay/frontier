// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use tauri::Manager;
use crate::unrestricted_fs::*;
use crate::debug_logging::*;

mod unrestricted_fs;
mod debug_logging;

fn main() {
  tauri::Builder::default()
      .setup(|app| {
              let window = app.get_window("main").unwrap();
              window.listen("tauri://navigation", |event| {
                      if let Some(payload) = event.payload() {
                              println!("Received navigation event with payload: {:?}", payload);
                      }
              });

              Ok(())
      })
      .invoke_handler(tauri::generate_handler![
          read_file,
          write_file,
          remove_file,
          create_directory,
          remove_directory,
          list_files,
          list_subdirectories,
          join_path,
          file_exists,
          broadcast_redirection
      ])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
