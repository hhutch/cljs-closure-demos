(ns combobox
  (:require
    [clojure.browser.dom :as dom]
    [goog.debug.DivConsole :as goog-dc]
    [goog.events :as goog-events]
    [goog.ui.ComboBox :as combo-box]))

(defn ^:export setup []
  (let [log-console (goog.debug.DivConsole. (dom/get-element "log"))
        el (dom/get-element "combo1")
        cb (goog.ui.ComboBox.)
        newfolder (goog.ui.ComboBoxItem. "New Folder...")
        el2 (dom/get-element "combo2")
        cb2 (goog.ui.ComboBox.)
        caption (goog.ui.ComboBoxItem. "Select a Color...")]
    (.. goog.debug -LogManager getRoot (setLevel goog.debug.Logger.Level.ALL))
    (. log-console (setCapturing true))
    (. newfolder (setSticky true))
    (doto cb
      (.setUseDropdownArrow true)
      (.setDefaultText "Select a folder...")
      (.addItem (goog.ui.ComboBoxItem. "Inbox"))
      (.addItem (goog.ui.ComboBoxItem. "Bills & statements"))
      (.addItem (goog.ui.ComboBoxItem. "Cal alumni"))
      (.addItem (goog.ui.ComboBoxItem. "Calendar Stuff"))
      (.addItem (goog.ui.ComboBoxItem. "Design"))
      (.addItem (goog.ui.ComboBoxItem. "Music"))
      (.addItem (goog.ui.ComboBoxItem. "Netflix"))
      (.addItem (goog.ui.ComboBoxItem. "Personal"))
      (.addItem (goog.ui.ComboBoxItem. "Photos"))
      (.addItem (goog.ui.ComboBoxItem. "Programming"))
      (.addItem newfolder)
      (.render el))
    (doto caption
      (.setSticky true)
      (.setEnabled true))
    (doto cb2
      (.setDefaultText "Select a color...")
      (.addItem (goog.ui.ComboBoxItem. "Red"))
      (.addItem (goog.ui.ComboBoxItem. "Maroon"))
      (.addItem (goog.ui.ComboBoxItem. "Green"))
      (.addItem (goog.ui.ComboBoxItem. "Blue"))
      (.addItem (goog.ui.ComboBoxItem. "Royal Blue"))
      (.addItem (goog.ui.ComboBoxItem. "Yellow"))
      (.addItem (goog.ui.ComboBoxItem. "Magenta"))
      (.addItem (goog.ui.ComboBoxItem. "Mouve"))
      (.addItem (goog.ui.ComboBoxItem. "Grey"))
      (.addItemAt caption 0)
      (.render el2))

    
    (.listen goog.events
           cb "change"
           (fn [e] (. goog.dom (setTextContent (dom/get-element "v") (.. e -target (getValue))))))
    (.listen goog.events
           cb2 "change"
           (fn [e] (. goog.dom (setTextContent (dom/get-element "v") (.. e -target (getValue))))))
    (.listen goog.events
           (dom/get-element "clearlog")
           goog.events.EventType.CLICK
           (fn [e] (. log-console clear)))

    ;(set! (. js/window (onbeforeunload)) (fn [] (. cb (dispose)) (. cb2 (dispose))))
))

