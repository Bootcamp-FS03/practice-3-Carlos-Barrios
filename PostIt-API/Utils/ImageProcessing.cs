namespace PostIt_API.Utils;

public static class ImageProcessing
{
    public static string SavePicture(string id, string base64Image, string type)
    {
        byte[] imageBytes = Convert.FromBase64String(base64Image);
        string fileName = string.Empty;
        if (type.Equals("User"))
            fileName = $"{id}_profile.jpg";
        else
            fileName = $"{id}_image.jpg";
        string projectDirectory = Directory.GetParent(AppDomain.CurrentDomain.BaseDirectory).Parent.Parent.Parent.FullName;
        string relativePath = Path.Combine("Uploads", type, fileName);
        string filePath = Path.Combine(projectDirectory, relativePath);
        Directory.CreateDirectory(Path.GetDirectoryName(filePath));
        System.IO.File.WriteAllBytes(filePath, imageBytes);
        return relativePath;
    }
}
