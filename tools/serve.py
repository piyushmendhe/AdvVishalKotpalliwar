"""Local preview server that never caches, so edits show up on refresh.

usage: python3 tools/serve.py [port]
"""
import http.server
import sys


class Handler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header("Cache-Control", "no-store")
        super().end_headers()


if __name__ == "__main__":
    port = int(sys.argv[1]) if len(sys.argv) > 1 else 4173
    http.server.ThreadingHTTPServer(("127.0.0.1", port), Handler).serve_forever()
