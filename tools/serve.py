"""Local preview server that never caches, so edits show up on refresh.

usage: python3 tools/serve.py [port] [--lan]

--lan also accepts connections from other devices on the same network, for
checking the site on a phone. Without it only this computer can connect.
"""
import http.server
import sys
import urllib.parse


class Handler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header("Cache-Control", "no-store")
        super().end_headers()

    def send_head(self):
        # never serve hidden files or folders (.git, .claude, ...)
        path = urllib.parse.unquote(self.path.split("?", 1)[0].split("#", 1)[0])
        if any(part.startswith(".") for part in path.split("/") if part):
            self.send_error(404)
            return None
        return super().send_head()


if __name__ == "__main__":
    lan = "--lan" in sys.argv[1:]
    args = [a for a in sys.argv[1:] if a != "--lan"]
    port = int(args[0]) if args else 4173
    http.server.ThreadingHTTPServer(("0.0.0.0" if lan else "127.0.0.1", port), Handler).serve_forever()
