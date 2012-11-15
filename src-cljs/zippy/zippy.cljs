(ns zippy
  (:require
    [clojure.browser.dom :as dom]
    [goog.debug.DivConsole :as goog-dc]
    [goog.debug.LogManager :as goog-lm]
    [goog.debug.Logger :as goog-logger]
    [goog.events :as goog-events]
    [goog.ui.AnimatedZippy :as zippy-animated]
    [goog.ui.Zippy :as zippy]
    [goog.ui.ZippyEvent :as zippy-event]))

(defn ^:export setup []
  (.. goog.debug.LogManager (getRoot) (setLevel goog.debug.Logger.Level.ALL))
  (let [logger (. goog.debug.Logger (getLogger "zippy"))
        logconsole (goog.debug.DivConsole. (dom/get-element "log")) 
        EVENTS (goog.object.getValues. goog.ui.Zippy.Events)
        log-event (fn [event]
                    (let [caption (.. event -target -elHeader_ -id)]
                      (. logger (info (str "\"" caption "\" dispatched: " (.-type event)))))) 
        z1 (goog.ui.Zippy. "header1" "content1") 
        z2 (goog.ui.AnimatedZippy. "header2" "content2" true)
        z3 (goog.ui.AnimatedZippy. "header3" "content3" false) 
        zippy-toggle (fn [event]
                       (. z3 (setExpanded (not (.-expanded event))))) ]
    (. logconsole (setCapturing true))
    (. logger (fine (str "Listening for:" (apply str (interpose ", " EVENTS)) ".")))
    (doto goog.events
      (.listen z1 EVENTS log-event)
      (.listen z2 EVENTS log-event)
      (.listen z3 EVENTS log-event)
      (.listen z2 "toggle" zippy-toggle))
    (.expand z1)))
