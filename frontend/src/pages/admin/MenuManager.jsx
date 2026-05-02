import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Plus, Edit3, Trash2, Save, X, UtensilsCrossed, Search, Filter
} from 'lucide-react';
import { useDispatch } from 'react-redux';
import { addNotification } from '../../store/slices/uiSlice';
import Navbar from '../../components/Navbar';
import EmptyState from '../../components/ui/EmptyState';

const initialMeals = [
  { id: 1, name: 'Paneer Butter Masala', category: 'North Indian', calories: 480, price: 120, inventory: 50, active: true },
  { id: 2, name: 'Dal Tadka + Rice', category: 'North Indian', calories: 380, price: 90, inventory: 80, active: true },
  { id: 3, name: 'Chole Bhature', category: 'North Indian', calories: 550, price: 100, inventory: 40, active: true },
  { id: 4, name: 'Grilled Chicken Bowl', category: 'Continental', calories: 420, price: 150, inventory: 30, active: true },
  { id: 5, name: 'Veg Thali', category: 'Thali', calories: 520, price: 110, inventory: 60, active: false },
  { id: 6, name: 'Rajma Chawal', category: 'North Indian', calories: 410, price: 85, inventory: 70, active: true },
];

const emptyMeal = { name: '', category: 'North Indian', calories: '', price: '', inventory: '', active: true };
const categories = ['North Indian', 'South Indian', 'Continental', 'Chinese', 'Thali'];

const MenuManager = () => {
  const dispatch = useDispatch();
  const [meals, setMeals] = useState(initialMeals);
  const [search, setSearch] = useState('');
  const [editing, setEditing] = useState(null); // meal id or 'new'
  const [form, setForm] = useState(emptyMeal);

  // Performance: memoize filtered list
  const filtered = useMemo(() => 
    meals.filter((m) => m.name.toLowerCase().includes(search.toLowerCase())),
    [meals, search]
  );

  const startEdit = (meal) => {
    setEditing(meal.id);
    setForm({ ...meal });
  };

  const startAdd = () => {
    setEditing('new');
    setForm(emptyMeal);
  };

  const cancelEdit = () => {
    setEditing(null);
    setForm(emptyMeal);
  };

  const saveMeal = () => {
    if (!form.name || !form.calories || !form.price) {
      dispatch(addNotification({ message: 'Please fill all required fields.', type: 'error' }));
      return;
    }
    if (editing === 'new') {
      const newMeal = { ...form, id: Date.now(), calories: +form.calories, price: +form.price, inventory: +form.inventory || 0 };
      setMeals((prev) => [...prev, newMeal]);
      dispatch(addNotification({ message: `"${form.name}" added to menu!`, type: 'success' }));
    } else {
      setMeals((prev) => prev.map((m) =>
        m.id === editing ? { ...form, calories: +form.calories, price: +form.price, inventory: +form.inventory || 0 } : m
      ));
      dispatch(addNotification({ message: `"${form.name}" updated!`, type: 'success' }));
    }
    cancelEdit();
  };

  const deleteMeal = (id, name) => {
    setMeals((prev) => prev.filter((m) => m.id !== id));
    dispatch(addNotification({ message: `"${name}" removed from menu.`, type: 'info' }));
  };

  const toggleActive = (id) => {
    setMeals((prev) => prev.map((m) =>
      m.id === id ? { ...m, active: !m.active } : m
    ));
  };

  return (
    <div className="min-h-screen bg-espresso">
      <Navbar />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10"
        >
          <div>
            <h1 className="text-3xl font-serif font-bold text-offwhite mb-1">
              Menu Manager <span className="text-gold">🍽️</span>
            </h1>
            <p className="text-warm-grey text-sm">Add, edit, or remove meals from the daily menu.</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={startAdd}
            className="flex items-center gap-2 bg-gold hover:bg-gold-light text-espresso px-5 py-2.5 rounded-xl font-bold text-sm transition-colors shadow-lg shadow-gold/20"
            id="add-meal-btn"
          >
            <Plus className="w-4 h-4" /> Add Meal
          </motion.button>
        </motion.div>

        {/* Search & Stats */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
           <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-warm-grey" />
            <input
              type="text"
              placeholder="Search meals..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-cocoa border border-white/10 rounded-xl pl-11 pr-4 py-3.5 text-sm text-offwhite placeholder-warm-grey/40 focus:outline-none focus:border-gold/30 transition-all"
            />
          </div>
          <div className="flex gap-4">
             <div className="bg-cocoa border border-white/5 rounded-xl px-4 py-2 flex items-center gap-3">
                <span className="text-xs text-warm-grey uppercase font-bold tracking-wider">Total</span>
                <span className="text-gold font-serif font-bold">{meals.length}</span>
             </div>
             <div className="bg-cocoa border border-white/5 rounded-xl px-4 py-2 flex items-center gap-3">
                <span className="text-xs text-warm-grey uppercase font-bold tracking-wider">Active</span>
                <span className="text-emerald-400 font-serif font-bold">{meals.filter(m => m.active).length}</span>
             </div>
          </div>
        </div>

        {/* Add/Edit Form */}
        <AnimatePresence>
          {editing !== null && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden mb-8"
            >
              <div className="bg-cocoa border border-gold/20 rounded-2xl p-6 shadow-2xl shadow-gold/5">
                <h3 className="text-sm font-bold text-gold mb-6 uppercase tracking-widest">
                  {editing === 'new' ? '➕ Add New Meal' : '✏️ Edit Meal'}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-6">
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase font-bold text-warm-grey ml-1">Meal Name</label>
                    <input
                      type="text"
                      placeholder="e.g. Butter Chicken"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full bg-espresso border border-white/10 rounded-xl px-4 py-3 text-sm text-offwhite focus:outline-none focus:border-gold/30"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase font-bold text-warm-grey ml-1">Category</label>
                    <select
                      value={form.category}
                      onChange={(e) => setForm({ ...form, category: e.target.value })}
                      className="w-full bg-espresso border border-white/10 rounded-xl px-4 py-3 text-sm text-warm-grey focus:outline-none focus:border-gold/30"
                    >
                      {categories.map((c) => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase font-bold text-warm-grey ml-1">Calories</label>
                    <input
                      type="number"
                      placeholder="kcal"
                      value={form.calories}
                      onChange={(e) => setForm({ ...form, calories: e.target.value })}
                      className="w-full bg-espresso border border-white/10 rounded-xl px-4 py-3 text-sm text-offwhite focus:outline-none focus:border-gold/30"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase font-bold text-warm-grey ml-1">Price (₹)</label>
                    <input
                      type="number"
                      placeholder="Amount"
                      value={form.price}
                      onChange={(e) => setForm({ ...form, price: e.target.value })}
                      className="w-full bg-espresso border border-white/10 rounded-xl px-4 py-3 text-sm text-offwhite focus:outline-none focus:border-gold/30"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase font-bold text-warm-grey ml-1">Inventory</label>
                    <input
                      type="number"
                      placeholder="Max daily orders"
                      value={form.inventory}
                      onChange={(e) => setForm({ ...form, inventory: e.target.value })}
                      className="w-full bg-espresso border border-white/10 rounded-xl px-4 py-3 text-sm text-offwhite focus:outline-none focus:border-gold/30"
                    />
                  </div>
                </div>
                <div className="flex gap-3 justify-end border-t border-white/5 pt-6">
                  <button
                    onClick={cancelEdit}
                    className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold text-warm-grey hover:text-offwhite transition-colors"
                  >
                    Cancel
                  </button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={saveMeal}
                    className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-8 py-2.5 rounded-xl font-bold text-sm transition-colors shadow-lg shadow-emerald-500/10"
                  >
                    <Save className="w-4 h-4" /> Save Meal
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Meals Table or Empty State */}
        <div className="bg-cocoa border border-white/5 rounded-3xl overflow-hidden shadow-xl">
          {filtered.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-white/5 bg-white/[0.01]">
                    <th className="px-6 py-5 text-xs font-bold text-warm-grey uppercase tracking-widest">Meal</th>
                    <th className="px-4 py-5 text-xs font-bold text-warm-grey uppercase tracking-widest hidden sm:table-cell">Category</th>
                    <th className="px-4 py-5 text-xs font-bold text-warm-grey uppercase tracking-widest">Cal</th>
                    <th className="px-4 py-5 text-xs font-bold text-warm-grey uppercase tracking-widest">Price</th>
                    <th className="px-4 py-5 text-xs font-bold text-warm-grey uppercase tracking-widest hidden md:table-cell">Stock</th>
                    <th className="px-4 py-5 text-xs font-bold text-warm-grey uppercase tracking-widest">Status</th>
                    <th className="px-6 py-5 text-xs font-bold text-warm-grey uppercase tracking-widest text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <AnimatePresence>
                    {filtered.map((meal) => (
                      <MenuRow 
                        key={meal.id} 
                        meal={meal} 
                        onEdit={startEdit} 
                        onDelete={deleteMeal} 
                        onToggle={toggleActive} 
                      />
                    ))}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>
          ) : (
            <EmptyState 
              title="No meals found" 
              message={search ? `No results for "${search}"` : "Your menu is empty."}
              icon={Search}
              action={search ? { label: "Clear Search", onClick: () => setSearch('') } : null}
            />
          )}
        </div>
      </div>
    </div>
  );
};

// Memoized row for performance
const MenuRow = React.memo(({ meal, onEdit, onDelete, onToggle }) => (
  <motion.tr 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="border-b border-white/5 last:border-0 hover:bg-white/[0.02] transition-colors group"
  >
    <td className="px-6 py-4">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-gold/10 flex items-center justify-center">
          <UtensilsCrossed className="w-4 h-4 text-gold" />
        </div>
        <span className="text-sm font-bold text-offwhite">{meal.name}</span>
      </div>
    </td>
    <td className="px-4 py-4 text-xs text-warm-grey hidden sm:table-cell font-medium">{meal.category}</td>
    <td className="px-4 py-4 text-xs text-warm-grey">{meal.calories}</td>
    <td className="px-4 py-4 text-xs text-offwhite font-bold">₹{meal.price}</td>
    <td className="px-4 py-4 text-xs text-warm-grey hidden md:table-cell">{meal.inventory}</td>
    <td className="px-4 py-4">
      <button
        onClick={() => onToggle(meal.id)}
        className={`text-[10px] px-3 py-1 rounded-full font-black uppercase tracking-tighter cursor-pointer transition-all ${
          meal.active ? 'text-emerald-400 bg-emerald-400/10 hover:bg-emerald-400/20' : 'text-warm-grey bg-white/5 hover:bg-white/10'
        }`}
      >
        {meal.active ? 'Active' : 'Inactive'}
      </button>
    </td>
    <td className="px-6 py-4">
      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={() => onEdit(meal)}
          className="w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center text-warm-grey hover:text-gold hover:bg-gold/10 transition-all"
        >
          <Edit3 className="w-4 h-4" />
        </button>
        <button
          onClick={() => onDelete(meal.id, meal.name)}
          className="w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center text-warm-grey hover:text-red-400 hover:bg-red-400/10 transition-all"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </td>
  </motion.tr>
));

export default MenuManager;
