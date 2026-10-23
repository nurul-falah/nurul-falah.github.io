.PHONY: help dev build deploy preview

PORT ?= 3000

# Package manager fallback: bun -> npm
PM ?= $(shell command -v bun 2>/dev/null || echo npm)

help:
	@echo "DKM Masjid Nurul Falah (dkmnf) Commands:"
	@echo "  make dev      - Start local Vite development server (:$(PORT))"
	@echo "  make build    - Build production bundle (tsc && vite build)"
	@echo "  make preview  - Preview production build (:$(PORT))"
	@echo "  make deploy   - Commit and push changes to GitHub Pages"

node_modules:
	@echo "📦 Installing dependencies with $(PM)..."
	$(PM) install

dev: node_modules
	@echo "🌐 Running local Vite server on http://localhost:$(PORT)..."
	$(PM) run dev -- --port $(PORT)

build: node_modules
	$(PM) run build

preview: node_modules
	@echo "🌐 Previewing production build on http://localhost:$(PORT)..."
	$(PM) run preview -- --port $(PORT)

deploy:
	git add .
	(git diff --staged --quiet || git commit -m "feat: update Masjid Nurul Falah portal $(shell date +%Y-%m-%d)")
	git push origin main
	@echo "✅ Pushed to main. GitHub Actions will deploy to https://burubur.github.io/dkmnf/"
