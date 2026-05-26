--DISPLAY average temp
SELECT AVG(value)
FROM avg_temp FROM temperatures
GROUP BY city
ORDER BY avg_temp DESC