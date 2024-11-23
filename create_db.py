import sqlite3
import os
import base64


def delete_database_if_exists():
    database_path = "data.db"

    if os.path.exists(database_path):
        os.remove(database_path)


def create_songs_table(cursor: sqlite3.Cursor):
    cursor.execute(
        """
    CREATE TABLE IF NOT EXISTS songs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        year INTEGER,
        artist TEXT,
        album TEXT,
        title TEXT,
        album_cover TEXT,  -- Storing as a Base64 string
        song TEXT          -- Storing as a Base64 string
    )
    """
    )


def encode_file(file_path):
    with open(file_path, "rb") as f:
        return base64.b64encode(f.read()).decode("utf-8")


def add_song(
    cursor: sqlite3.Cursor,
    year: int,
    artist: str,
    album: str,
    title: str,
    album_cover_path: str,
    song_path: str,
):
    album_cover = encode_file(album_cover_path)
    song = encode_file(song_path)

    cursor.execute(
        """
    INSERT INTO songs (year, artist, album, title, album_cover, song)
    VALUES (?, ?, ?, ?, ?, ?)
    """,
        (year, artist, album, title, album_cover, song),
    )


def main():
    delete_database_if_exists()

    conn = None
    cursor = None

    SONGS = [
        (
            2024,
            "Surra",
            "Falha Crítica",
            "Plano Infalível",
            "songs/Falha Crítica.jpeg",
            "songs/Surra - Plano Infalível.mp3",
        ),
    ]

    try:
        conn = sqlite3.connect("data.db")
        cursor = conn.cursor()

        create_songs_table(cursor)

        for song in SONGS:
            add_song(cursor, *song)

        conn.commit()
    finally:
        if conn:
            conn.close()


if __name__ == "__main__":
    main()
