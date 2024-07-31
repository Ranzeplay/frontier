#[tauri::command]
pub fn broadcast_redirection(url: String) {
    println!("Webpage redirecting to: {}", url);
}
