(ns demos
  (:require
    [goog.dom :as g-dom]
    ;[goog.dom.query :as dom-query]
    [clojure.browser.dom :as dom]))

(defn ^:export setup []
  (let [all-demos (goog.dom.query. "ul > li > a.inactive")]
        ;  this.slides = goog.dom.query( ‘#’ + slideshow + ‘ > ul > li’ );
    (doseq [links all-demos]
      (.listen goog.events links
                            goog.events.EventType.CLICK
                           (fn [e] (js/alert "why") )))))
