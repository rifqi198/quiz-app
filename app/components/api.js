export const getQuizData = async () => {
    try {
      const response = await fetch("https://opentdb.com/api.php?amount=5&type=multiple");
      if (!response.ok) {
        throw new Error('Failed to fetch questions');
      }
      return await response.json();
    } catch (error) {
      console.error(error);
      return null;
    }
}