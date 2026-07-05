# Databases

The data pipeline side of the curriculum — because before you can train
on data, you have to be able to store and query it. This project is
MySQL practice: creating databases and tables, inserting data, and
writing increasingly involved queries against real-ish datasets
(city temperatures and a TV shows database).

## Files

| File | What it does |
|------|--------------|
| `0-create_database_if_missing.sql` | Creates `db_0` only if it doesn't already exist |
| `1-first_table.sql` | Creates a `first_table` with an id and a name |
| `2-list_values.sql` | Lists all rows of `first_table` |
| `3-insert_value.sql` | Inserts a new row into `first_table` |
| `4-best_score.sql` | Lists records with a score ≥ 10, best first |
| `5-average.sql` | Computes the average score of a table |
| `6-avg_temperatures.sql` | Average temperature per city, hottest first |
| `7-max_state.sql` | Max temperature per state, ordered by state |
| `8-genre_id_by_show.sql` | Joins shows with their genres — only shows that have at least one |

## Support files

- `temperatures.sql` — the temperature dataset for tasks 6–7
- `hbtn_0d_tvshows.sql` — the TV shows database for task 8

## Running

Pipe a task into mysql:

```bash
cat 0-create_database_if_missing.sql | mysql -uroot -p
```

Load a dataset first when a task needs one:

```bash
cat temperatures.sql | mysql -uroot -p my_db
```

## Notes

- MySQL 8.0 on Ubuntu 20.04
- Every file starts with a comment describing the task, and keywords are
  uppercase — the checker insists
