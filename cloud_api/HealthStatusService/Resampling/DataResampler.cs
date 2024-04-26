using System;
using System.Collections.Generic;

namespace HealthStatusService.Resampling
{
    /// <summary>
    /// Provides methods for resampling boolean data.
    /// </summary>
    public class DataResampler
    {
        /// <summary>
        /// Resamples a list of boolean data to the specified target count.
        /// </summary>
        /// <param name="data">The data list of boolean data to be resampled.</param>
        /// <param name="requested">The desired count of the resampled data.</param>
        /// <returns>A resampled list of boolean data.</returns>
        public static List<bool> ResampleData(List<bool> data, int requested)
        {
            List<bool> resampled = new List<bool>();

            // Return an empty list if the data list is null, empty, or the target count is invalid
            if (data == null || data.Count == 0 || requested <= 0)
                return resampled;

            // If the data list has the same count as the target count, return it as is
            if (data.Count == requested)
                return new List<bool>(data);

            // Calculate the step size for resampling
            double step = (double)(data.Count - 1) / (requested - 1);

            // Resample the data
            for (int i = 0; i < requested; i++)
            {
                double index = i * step;
                int lowerIndex = (int)index;
                int upperIndex = Math.Min(lowerIndex + 1, data.Count - 1);

                // Handle out-of-range indices
                if (lowerIndex < 0 || upperIndex < 0 || lowerIndex >= data.Count || upperIndex >= data.Count)
                    resampled.Add(false); // Assuming false for out-of-range indices
                else
                    resampled.Add(data[lowerIndex] && data[upperIndex]); // Use logical AND for boolean values
            }

            return resampled;
        }
    }
}
