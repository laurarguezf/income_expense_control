function NewLog() {
  return (
    <>
      <div>
        <header className="newlog_header">
          <h2>New data</h2>
          <button>X</button>
        </header>
        <section>
          <h3>Input your new expense data</h3>
          <form>
            <div>
              <label htmlFor="date">Expense date:</label>
              <input type="date" name="date" id="date" required={true}
                /*value={selectedDate}*/
                /*onChange={handleInput}*/
              />
            </div>
            <div>
              <label htmlFor="type">Select an expense type:</label>
              <select type="options" name="type" id="type" required={true}
                /*onInput={handleInput}*/
                /*value={selectedType}*/
              >
                <option value="">--Select--</option>
                <option value="expense">Expense</option>
                <option value="income">Income</option>
              </select>
            </div>
            <div>
              <label htmlFor="category">Select a category:</label>
              <select type="options" name="category" id="category" required={true}
                /*onInput={handleInput}
                value={selectedCategory}*/
              >
                <option value="">--Select--</option>
                <option value="food">Food</option>
                <option value="house">House</option>
              </select>
            </div>
            <div>
              <label htmlFor="desc">Description:</label>
              <input type="text" name="desc" id="desc" required={true}
                /*onInput={handleInput}*/
                /*value={description}*/
              />
            </div>
            <div>
              <label htmlFor="amount">Amount:</label>
              <input type="number" name="amount" id="amount" required={true} inputMode="numeric"
                /*onInput={handleInput}*/
                /*value={amount}*/
              />
            </div>
            <div>
              <button type="submit">Submit</button>
              <button type="reset" /*onClick={handleCloseClick}*/>Cancel</button>
            </div>
          </form>
        </section>
      </div>
    </>
  );
}

export default NewLog;