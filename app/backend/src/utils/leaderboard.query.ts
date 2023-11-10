export default `
SELECT
  l.name,
  (l.totalVictories * 3 + l.totalDraws) AS totalPoints,
  l.totalGames,
  l.totalVictories,
  l.totalDraws,
  l.totalLosses,
  l.goalsFavor,
  l.goalsOwn,
  (l.goalsFavor - l.goalsOwn) AS goalsBalance,
  ((l.totalVictories * 3 + l.totalDraws) / (l.totalGames * 3)) * 100 AS efficiency
FROM
  (
    SELECT
      t.team_name AS name,
      COUNT(*) AS totalGames,
      SUM(
        CASE
          WHEN m.home_team_goals > m.away_team_goals THEN 1
          ELSE 0
        END
      ) AS totalVictories,
      SUM(
        CASE
          WHEN m.home_team_goals = m.away_team_goals THEN 1
          ELSE 0
        END
      ) AS totalDraws,
      SUM(
        CASE
          WHEN m.home_team_goals < m.away_team_goals THEN 1
          ELSE 0
        END
      ) AS totalLosses,
      SUM(m.home_team_goals) as goalsFavor,
      SUM(m.away_team_goals) as goalsOwn,
      (SUM(m.home_team_goals) - SUM(m.away_team_goals)) as goalsBalance
    FROM
      matches as m
      JOIN teams as t ON m.home_team_id = t.id
    WHERE
      in_progress = false
    GROUP BY
      name
  ) AS l
  ORDER BY
    totalPoints DESC,
    goalsBalance DESC,
    goalsFavor DESC
  `;
