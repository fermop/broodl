import { useAuth } from "@/context/AuthContext";

export function useStats(data) {
    function countValues() {
        if (!data) return { num_days: 0, average_mood: 0 }

        let total_number_of_days = 0
        let sum_moods = 0

        for (let year in data) {
            for (let month in data[year]) {
                for (let day in data[year][month]) {
                    let days_mood = data[year][month][day]
                    total_number_of_days++
                    sum_moods += days_mood
                }
            }
        }
        
        const average = total_number_of_days > 0 ? (sum_moods / total_number_of_days) : 0
        
        return { 
            num_days: total_number_of_days, 
            average_mood: average 
        }
    }

    return countValues()
}