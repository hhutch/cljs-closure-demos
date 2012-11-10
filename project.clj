(defproject cljs-closure-demos "0.1.0-SNAPSHOT"
  :description "FIXME: write description"
  :url "http://example.com/FIXME"
  :license {:name "Eclipse Public License"
            :url "http://www.eclipse.org/legal/epl-v10.html"}
  :dependencies [[org.clojure/clojure "1.4.0"]]
  :plugins [[lein-cljsbuild "0.2.9"]]
  :cljsbuild {
              :builds {:advancedtooltip
                       {:source-path "src-cljs/advancedtooltip"
                        :compiler {:output-to "resources/public/cljs/advancedtooltip.js"}
                        :optimizations :whitespace
                        :pretty-print true}
                       :autocompletebasic
                       {:source-path "src-cljs/autocomplete_basic"
                        :compiler {:output-to "resources/public/cljs/autocompletebasic.js"}
                        :optimizations :whitespace
                        :pretty-print true}}
              })
