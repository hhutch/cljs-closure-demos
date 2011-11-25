(ns submenus2
  (:require
    [goog.dom :as dom]
    [goog.debug :as goog-debug]
    [goog.positioning.Corner :as corner]
    [goog.ui.Menu :as goog-menu]
    [goog.ui.SubMenu :as goog-submenu]
    [goog.ui.PopupMenu :as goog-popupmenu]))

(defn ^:export setup []
  (let [menu (goog.ui.PopupMenu.)
        shared-decorated-submenu (goog.ui.Menu.)
        shared-submenu (goog.ui.Menu.)
        sa (goog.ui.SubMenu. "Shared sub one")
        sb (goog.ui.SubMenu. "Shared sub four")
        a (goog.ui.SubMenu. "Zero")
        b (goog.ui.SubMenu. "Ten")
        c (goog.ui.SubMenu. "Twenty")
        d (goog.ui.SubMenu. "Thirty")
        e (goog.ui.SubMenu. "Has shared one")
        f (goog.ui.SubMenu. "Has shared two")
        g (goog.ui.SubMenu. "Has shared three")
        h (goog.ui.SubMenu. "Has decorated shared one")
        i (goog.ui.SubMenu. "Has decorated shared two")
        j (goog.ui.SubMenu. "Has decorated shared three")
        aa (goog.ui.SubMenu. "One")
        cb (goog.ui.SubMenu. "Twenty-one")
        cbd (goog.ui.SubMenu. "More")
        ccc (goog.ui.MenuItem. "CcCcCcCcCcCc")]
    (. menu (attach (dom/getElement "button")
                    (.BOTTOM_LEFT goog.positioning.Corner)
                    (.TOP_LEFT goog.positioning.Corner)))
    (. shared-decorated-submenu (decorate (dom/getElement "sharedMenu")))
    ;(. sa (addItem (. goog.ui (MenuItem "Shared sub sub one"))))
    (doto sa (.addItem (goog.ui.MenuItem. "Shared sub sub one"))
             (.addItem (goog.ui.MenuItem. "Shared sub sub two")))
    (. sb (setMenu shared-decorated-submenu))
    (doto shared-submenu (.addItem sa)
                         (.addItem (goog.ui.MenuItem. "Shared sub two"))
                         (.addItem (goog.ui.MenuItem. "Shared sub three"))
                         (.addItem sb))
    (doseq [item [e f g]]
      (. item (setMenu shared-submenu)))
    (doseq [item [h i j]] 
      (. item (setMenu shared-decorated-submenu)))

    (doto aa (.setEnabled false)
             (.addItem (goog.ui.MenuItem. "Add"))
             (.addItem (goog.ui.MenuItem. "Subtract"))
             (.addItem (goog.ui.MenuItem. "Multiply")))
    (doto a (.addItem aa)
            (.addItem (goog.ui.MenuItem. "Two"))
            (.addItem (goog.ui.MenuItem. "Three"))
            (.addItem (goog.ui.MenuItem. "Four")))
    (doto b (.addItem (goog.ui.MenuItem. "Eleven"))
            (.addItem (goog.ui.MenuItem. "Thirteen"))
            (.addItem (goog.ui.MenuItem. "Fourteen"))
            (.addItem (goog.ui.MenuItem. "Fifteen")))
    (. c (addItem (goog.ui.MenuItem. "Twenty-one")))
    (doto cb (.addItem (goog.ui.MenuItem. "Add"))
             (.addItem (goog.ui.MenuItem. "Subtract"))
             (.addItem (goog.ui.MenuItem. "Multiply")))
    (doto cbd (.addItem (goog.ui.MenuItem. "Square Root"))
              (.addItem (goog.ui.MenuItem. "Power"))
              (.addItem (goog.ui.MenuItem. "Square")))
    (. cb (addItem cbd))
    (doto c (.addItem cb)
            (.addItem (goog.ui.MenuItem. "Twenty-three"))
            (.addItem (goog.ui.MenuItem. "Twenty-four")))
    (doto d (.addItem (goog.ui.MenuItem. "Twenty-one"))
            (.addItem (goog.ui.MenuItem. "Twenty-two"))
            (.addItem (goog.ui.MenuItem. "Twenty-three"))
            (.addItem (goog.ui.MenuItem. "Twenty-four")))
    (. ccc (setEnabled false))

    (doto menu (.addItem a)
               (.addItem (goog.ui.MenuItem. "AaAaAaAaAaAa"))
               (.addItem (goog.ui.MenuItem. "BbBbBbBbBbBb"))
               (.addItem b) (.addItem c) (.addItem d)
               (.addItem e) (.addItem f) (.addItem g)
               (.addItem h) (.addItem i) (.addItem j)
               (.addItem ccc)
               (.addItem (goog.ui.MenuItem. "DdDdDdDdDdDd")))

    (. menu (render))
    (set! (.id (. menu (getElement))) "foo")

    (. goog.events (listen menu "action"
                     (fn [e]
                       (let [action (.. e target (getCaption))]
                         (js/alert action))))) ))
