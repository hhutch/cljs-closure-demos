# Clojurescript + Google Closure Demos

Reimplementation of the [Google Closure Demos](http://closure-library.googlecode.com/svn/trunk/closure/goog/demos/) in [Clojurescript](https://github.com/clojure/clojurescript).

View working demos at [hhutch.github.com/cljs-closure-demos](http://hhutch.github.com/cljs-closure-demos/).

Compile using leiningen cljsbuild
*Advanced compilation will cause some of these to fail.*

	lein cljsbuild auto
	lein cljsbuild once autocompletebasic

Use a local webserver to view the demos once compiled
	cd resources/public/ && python -m SimpleHTTPServer 8080 &
	chromium-browser http://localhost:8080/
	
### Work in Progress

## Currently the following demos do not work
- [ ] autocomplete rich remote
- [ ] charpicker
- [ ] d0mselection
- [ ] drilldownrow
- [ ] editor
- [ ] hsvapallette
- [ ] slider
