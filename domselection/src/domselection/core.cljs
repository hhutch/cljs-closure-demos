(ns domselection
  (:require
    [goog.dom :as dom]
    [goog.events :as goog-events]
    [goog.dom.selection :as select]))

(def is-syncing (atom false))

(defn sync [i]
  (reset! is-syncing true)
  (let [text-field (dom/getElement (str "textField" i))]
    (set! (.value (dom/getElement (str "selectionStart" i)) ) (. goog.dom.selection (getStart text-field)) )
    (set! (.value (dom/getElement (str "selectionEnd" i)) ) (. goog.dom.selection (getEnd text-field)) )
    (set! (.value (dom/getElement (str "selectionText" i)) ) (. goog.dom.selection (getText text-field)) ) )
  (reset! is-syncing false) )

(defn update [i]
  (reset! is-syncing true)
  (let [selection-start (.value (dom/getElement (str "selectionStart" i)))
        selection-end (.value (dom/getElement (str "selectionEnd" i)))
        selection-text (.value (dom/getElement (str "selectionText" i)))
        text-field (dom/getElement (str "textField" i)) ]
    (. text-field (focus))
    (if (not (js/isNaN selection-start))
      (. goog.dom.selection (setStart text-field selection-start)))
    (if (not (js/isNaN selection-end))
      (. goog.dom.selection (setEnd text-field selection-end)))
    (. goog.dom.selection (setText text-field selection-text)) )
  (reset! is-syncing false)
  (sync i) )

(defn ^:export setup []
  (sync 1)
  (sync 2) 
  (.listen goog.events
           (dom/getElement "button1")
           goog.events.EventType.CLICK
           (fn [e] (update 1)))
  (.listen goog.events
           (dom/getElement "button2")
           goog.events.EventType.CLICK
           (fn [e] (update 2)))
  (.listen goog.events
           (dom/getElement "textField1")
           "keydown"
           (fn [e] (sync 1)))
  (.listen goog.events
           (dom/getElement "textField1")
           "keyup"
           (fn [e] (sync 1)))
  (.listen goog.events
           (dom/getElement "textField2")
           "keydown"
           (fn [e] (sync 2)))
  (.listen goog.events
           (dom/getElement "textField2")
           "keyup"
           (fn [e] (sync 2)))
  
  )
