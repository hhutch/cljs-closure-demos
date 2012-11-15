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
                        :pretty-print true}
                       :animationqueue
                       {:source-path "src-cljs/animationqueue"
                        :compiler {:output-to "resources/public/cljs/animationqueue.js"}
                        :optimizations :whitespace
                        :pretty-print true}
                       :gauge
                       {:source-path "src-cljs/gauge"
                        :compiler {:output-to "resources/public/cljs/gauge.js"}
                        :optimizations :whitespace
                        :pretty-print true}
                       :bubble
                       {:source-path "src-cljs/bubble"
                        :compiler {:output-to "resources/public/cljs/bubble.js"}
                        :optimizations :whitespace
                        :pretty-print true}
                       :charcounter
                       {:source-path "src-cljs/charcounter"
                        :compiler {:output-to "resources/public/cljs/charcounter.js"}
                        :optimizations :whitespace
                        :pretty-print true}
                       :charpicker
                       {:source-path "src-cljs/charpicker"
                        :compiler {:output-to "resources/public/cljs/charpicker.js"}
                        :optimizations :whitespace
                        :pretty-print true}
                       :progressbar
                       {:source-path "src-cljs/progressbar"
                        :compiler {:output-to "resources/public/cljs/progressbar.js"}
                        :optimizations :whitespace
                        :pretty-print true}
                       :colorcontrast
                       {:source-path "src-cljs/colorcontrast"
                        :compiler {:output-to "resources/public/cljs/colorcontrast.js"}
                        :optimizations :whitespace
                        :pretty-print true}
                       :colorpicker
                       {:source-path "src-cljs/colorpicker"
                        :compiler {:output-to "resources/public/cljs/colorpicker.js"}
                        :optimizations :whitespace
                        :pretty-print true}
                       :datepicker
                       {:source-path "src-cljs/datepicker"
                        :compiler {:output-to "resources/public/cljs/datepicker.js"}
                        :optimizations :whitespace
                        :pretty-print true}
                       :combobox
                       {:source-path "src-cljs/combobox"
                        :compiler {:output-to "resources/public/cljs/combobox.js"}
                        :optimizations :whitespace
                        :pretty-print true}
                       :domselection
                       {:source-path "src-cljs/domselection"
                        :compiler {:output-to "resources/public/cljs/domselection.js"}
                        :optimizations :whitespace
                        :pretty-print true}
                       :drilldownrow
                       {:source-path "src-cljs/drilldownrow"
                        :compiler {:output-to "resources/public/cljs/drilldownrow.js"}
                        :optimizations :whitespace
                        :pretty-print true}
                       :scrollfloater
                       {:source-path "src-cljs/scrollfloater"
                        :compiler {:output-to "resources/public/cljs/scrollfloater.js"}
                        :optimizations :whitespace
                        :pretty-print true}
                       :serverchart
                       {:source-path "src-cljs/serverchart"
                        :compiler {:output-to "resources/public/cljs/serverchart.js"}
                        :optimizations :whitespace
                        :pretty-print true}
                       :slider
                       {:source-path "src-cljs/slider"
                        :compiler {:output-to "resources/public/cljs/slider.js"}
                        :optimizations :whitespace
                        :pretty-print true}
                       :submenus2
                       {:source-path "src-cljs/submenus2"
                        :compiler {:output-to "resources/public/cljs/submenus2.js"}
                        :optimizations :whitespace
                        :pretty-print true}
                       :tablesorter
                       {:source-path "src-cljs/tablesorter"
                        :compiler {:output-to "resources/public/cljs/tablesorter.js"}
                        :optimizations :whitespace
                        :pretty-print true}
                       :useragent
                       {:source-path "src-cljs/useragent"
                        :compiler {:output-to "resources/public/cljs/useragent.js"}
                        :optimizations :whitespace
                        :pretty-print true}
                       :zippy
                       {:source-path "src-cljs/zippy"
                        :compiler {:output-to "resources/public/cljs/zippy.js"}
                        :optimizations :whitespace
                        :pretty-print true}
                       :viewportsizemonitor
                       {:source-path "src-cljs/viewportsizemonitor"
                        :compiler {:output-to "resources/public/cljs/viewportsizemonitor.js"}
                        :optimizations :whitespace
                        :pretty-print true}
                       :labelinput
                       {:source-path "src-cljs/labelinput"
                        :compiler {:output-to "resources/public/cljs/labelinput.js"}
                        :optimizations :whitespace
                        :pretty-print true}
}})